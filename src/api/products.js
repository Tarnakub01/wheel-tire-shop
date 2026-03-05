// export async function getProducts() {
//     try{
//         const response = await fetch("/src/data/products.mock.json");

//         if(!response.ok){
//             throw new Error("failed to fetch products");
//         }

//         const data = await response.json();

//         return {data, error: null};
//     }catch(error){
//         return {data: null, error}
//     }
    
// }


function createError(type, message, originalError = null){
    return {
        type,
        message,
        originalError,
    };
}


async function fetchProducts(){
    const response = await fetch("/src/data/products.mock.json");

    if(!response.ok){
        throw new Error("failed to fetch Products");
    }

    return response.json();
}


export async function getProducts() {
  try {
    await delay(1000);

    if (shouldFail()) {
      throw new Error("Simulated network error");
    }

    const data = await Promise.race([
        fetchProducts(),
        timeout(1500),

    ]);
    
    return { data, error: null };
  } catch (err) {
    let error;
    if (err.message.includes("timeout")){
        error = createError(
            "TIMEOUT",
            "การเชื่อมต่อใชเสลานานเกินไป กรุณาลองใหม่",
            err
        );
    }else{
        error = createError(
            "NETWORK",
            "ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่",
            err
        );
    }
    return { data: null, error };
  }
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldFail() {
  return Math.random() < 0.5; // 50% พัง
}

function timeout(ms){
    return new Promise((_, reject)=>{
        setTimeout(()=> reject(new Error("Request timeout")), ms)
    });
}


