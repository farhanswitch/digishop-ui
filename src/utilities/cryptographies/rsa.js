import forge from "node-forge";

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAocZN3vHYtyuxICIXGUof
p8GQpyt4r51Xj/Avj+ZZKFO4ItROEVdFCi7b1eJlmqOQHhmcezIE2PL0EVG+ORuH
dKrV9mKCExDdKSGlBTlZ/TaEFqNlpz1TmmWGi0CsbLpAzlm4hae51QgmMmtCofzW
ChFUmV6ID4AZAJBqGG7tMV50fYof+oTELaI3a3Jf2zRO1E07ZlIXWcemfMxPVmE6
RJ5TH0X9CTEySt2/8Brv/zBDkFTtNXNLldA/H000tDnXLeevA23WBZxQMLslZ9j9
iAIwznS1IRSNTvMCI3MT5BZq5LNEAJBLOZAFddHwEu9Z4HJ9YdZRwdezns8V/u4r
nHd48P/eTOU05N6vpdBHdcs88DQTz1GLE4w2ePrOvR2ZHXDE1x1AokBYAOQfxhAl
K5/T1I45OrS8wqhjUh6yxJqKxNRqRGiTf0uk2FlbFI9Dx2AqC1fhDJDRcK+6IHZb
gk1mSyyTidRW//HVhkmNsXxOw1JVjpun7gXtcCBakApPmU1wspTwdeWgxsH0zPvx
5NY8BgnYgCauL+IO6Qory2U53OFA0G9M5eHbFgvVZ+NplfPJPcB8Z/z/WDkxVq8m
/qJ942CDDRTXJm8fgPlurHmBUWmnfuDeNPIrS0usByZznguSpvZlVYZkCEMG6+K1
Hr4p5nuVbK13vtu//xEuB0cCAwEAAQ==
-----END PUBLIC KEY-----`;

export function encryptRSA(data) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedPassword = forge.util.encode64(
    publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(), // pakai SHA-256
    })
  );
  return encryptedPassword;
}
