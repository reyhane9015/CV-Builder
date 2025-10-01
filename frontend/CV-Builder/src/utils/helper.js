export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};

// Resume bg color calc
// export const getLightColorFormImage = (imageUrl) => {
//   return new Promise((resolve, reject) => {
//     if (!imageUrl || typeof imageUrl !== "string") {
//       return reject(new Error("Invalid image URL"));
//     }

//     const img = new Image();
//     if (!imageUrl.startsWith("data:")) {
//       img.crossOrigin = "anonymous";
//     }

//     img.src = imageUrl;

//     img.onload = () => {
//       const canvas = document.createElement("canvas");

//       const ctx = canvas.getContext("2d");

//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);

//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       let r = 0,
//         g = 0,
//         b = 0,
//         count = 0;

//       for (let i = 0; i < imageData.length; i += 4) {
//         const red = imageData[i];
//         const green = imageData[i + 1];
//         const blue = imageData[i + 2];
//         const brightness = (red + green + blue) / 3;

//         if (brightness > 100) {
//           r += red;
//           g += green;
//           b += blue;
//           count++;
//         }
//       }

//       if (count === 0) {
//         resolve("#ffffff");
//       } else {
//         r = Math.round(r / count);
//         g = Math.round(g / count);
//         b = Math.round(b / count);
//         resolve(`rgb(${r} , ${g} , ${b})`);
//       }
//     };

//     img.onerror = (e) => {
//       console.log("failed to load image:", e);
//       reject(new Error("image could not be loaded or is blocked by CORS."));
//     };
//   });
// };

export const getLightColorFormImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl || typeof imageUrl !== "string") {
      return reject(new Error("Invalid image URL"));
    }

    const img = new Image();
    if (!imageUrl.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {
          const red = imageData.data[i];
          const green = imageData.data[i + 1];
          const blue = imageData.data[i + 2];
          const brightness = (red + green + blue) / 3;

          if (brightness > 80) {
            r += red;
            g += green;
            b += blue;
            count++;
          }
        }

        if (count === 0) {
          resolve("#f0f0f0");
        } else {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);

          r = Math.min(255, Math.max(150, r));
          g = Math.min(255, Math.max(150, g));
          b = Math.min(255, Math.max(150, b));
          resolve(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (e) {
        console.log("Error accessing image data:", e);
        resolve("#f0f0f0");
      }
    };

    img.onerror = (e) => {
      console.log("Failed to load image:", e);
      resolve("#f0f0f0");
    };
  });
};
