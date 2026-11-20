// Face ID / Touch ID / fingerprint unlock, with WebAuthn (a platform credential of this phone).
// The private key stays in the phone's secure chip; the server checks each unlock's signature
// (cockpit/api/calc/register, unlock) and only then gives the data.
import { getChallenge, registerCredential, unlockWithCredential } from './calcApi'

const CRED_KEY = 'calc_cred_id'

const toB64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const fromB64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0))

export class BiometricError extends Error {
  // code: 'unsupported' | 'cancelled' | 'failed'
  constructor (code) { super(code); this.code = code }
}

function remember (credId) {
  try { localStorage.setItem(CRED_KEY, credId) } catch (e) { /* storage blocked */ }
}

export async function biometricAvailable () {
  try {
    return !!window.PublicKeyCredential && await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch (e) {
    return false
  }
}

function mapError (e) {
  if (e instanceof BiometricError) return e
  if (e?.name === 'NotAllowedError' || e?.name === 'AbortError') return new BiometricError('cancelled')
  if (e?.name === 'NotSupportedError' || e?.name === 'SecurityError') return new BiometricError('unsupported')
  return new BiometricError('failed')
}

// Right after pairing: makes this phone's credential (asks Face ID / fingerprint once).
export async function registerBiometric () {
  try {
    if (!(await biometricAvailable())) throw new BiometricError('unsupported')
    const { challenge, userId } = await getChallenge()
    const cred = await navigator.credentials.create({
      publicKey: {
        rp: { id: window.location.hostname, name: 'delaFun calculator' },
        user: { id: fromB64u(userId), name: 'delafun', displayName: 'delaFun calculator' },
        challenge: fromB64u(challenge),
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' },
        attestation: 'none',
        timeout: 60000
      }
    })
    const r = cred.response
    if (typeof r.getPublicKey !== 'function' || typeof r.getAuthenticatorData !== 'function') throw new BiometricError('unsupported')
    const credentialId = toB64u(cred.rawId)
    await registerCredential({
      credentialId,
      publicKey: toB64u(r.getPublicKey()),
      alg: r.getPublicKeyAlgorithm(),
      clientDataJSON: toB64u(r.clientDataJSON),
      authenticatorData: toB64u(r.getAuthenticatorData())
    })
    remember(credentialId)
  } catch (e) {
    throw mapError(e)
  }
}

async function assertion (challenge, credentialId) {
  return navigator.credentials.get({
    publicKey: {
      challenge,
      rpId: window.location.hostname,
      allowCredentials: [{ type: 'public-key', id: fromB64u(credentialId), transports: ['internal'] }],
      userVerification: 'required',
      timeout: 60000
    }
  })
}

// On open / after 5 minutes away: Face ID / fingerprint, checked by the server.
export async function unlockBiometric () {
  try {
    const { challenge, credentialId } = await getChallenge()
    if (!credentialId) throw new BiometricError('failed')
    const a = await assertion(fromB64u(challenge), credentialId)
    await unlockWithCredential({
      credentialId: toB64u(a.rawId),
      clientDataJSON: toB64u(a.response.clientDataJSON),
      authenticatorData: toB64u(a.response.authenticatorData),
      signature: toB64u(a.response.signature)
    })
    remember(credentialId)
  } catch (e) {
    throw mapError(e)
  }
}

// Offline (no server to check it): still asks Face ID / fingerprint before showing the calculator.
// The saved calculations stay closed anyway until the server is back.
export async function unlockOffline () {
  try {
    const credentialId = localStorage.getItem(CRED_KEY)
    if (!credentialId) throw new BiometricError('failed')
    await assertion(crypto.getRandomValues(new Uint8Array(32)), credentialId)
  } catch (e) {
    throw mapError(e)
  }
}
