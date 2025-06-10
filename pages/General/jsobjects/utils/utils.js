export default {
  getSignature: ({ method, api, queryParams = '', ...params }) => {
    // Safely get tonce with fallbacks
    const tonce = params.tonce || (tonce_input?.text || '').toString();
    
    const accessKey = (params.accessKey || appsmith.store.accessKey || '').toString();
    const secretKey = (params.secretKey || appsmith.store.secretKey || '').toString();
    
    console.log("getSignature", method, api);
    console.log("Signature queryParams", queryParams);
    console.log("Signature tonce", tonce);
    
    const payload = `${method}|access-key=${accessKey}&tonce=${tonce}|${api}|${queryParams}`;
    console.log("Signature payload", payload);
    
    try {
      const hmac = forge.hmac.create();
      hmac.start("sha256", secretKey);
      hmac.update(payload);
      const signature = hmac.digest().toHex();
      console.log("Signature hmac", signature);
      return signature;
    } catch (e) {
      console.error("Signature generation failed", e);
      return "error_" + Date.now();
    }
  }
}