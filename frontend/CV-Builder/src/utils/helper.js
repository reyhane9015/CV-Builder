// import moment from "moment";
import html2canvas from "html2canvas";
import jalaali from "jalaali-js";

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};

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
      } catch (error) {
        console.error("Error accessing image data:", error);
        resolve("#f0f0f0");
      }
    };

    img.onerror = (error) => {
      console.error("Failed to load image:", error);
      resolve("#f0f0f0");
    };
  });
};

export const toShamsi = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const shamsi = jalaali.toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return `${shamsi.jy}/${shamsi.jm}/${shamsi.jd}`;
};
// ------------ Conver resume to image ---------------

const convertOklch = (value) => {
  if (!value || typeof value !== "string") return value;
  if (value.includes("oklch")) {
    return "#000";
  }
  return value;
};

export const fixTailwindColors = (element) => {
  if (!element) return;
  const elements = element.querySelectorAll("*");

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);

    ["color", "backgroundColor", "borderColor"].forEach((prop) => {
      let value = style.getPropertyValue(prop);
      if (value && value.includes("oklch")) {
        el.style.setProperty(prop, convertOklch(value), "important");
      }
    });
  });
};

export async function captureElementAsImage(element) {
  if (!element) throw new Error("No Element provided");

  // const canvas = await html2canvas(element);

  await Promise.all(
    Array.from(element.querySelectorAll("img")).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) return resolve();
          img.onload = resolve;
          img.onerror = () => {
            console.error("Image load error:", img.src);
            resolve(); // Continue even on error
          };
        })
    )
  );
  fixTailwindColors(element);

  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
    logging: false,
  });

  return canvas.toDataURL("image/png");
}

export const dataURLtoFile = (dataUrl, fileName) => {
  if (!dataUrl) {
    throw new Error("Invalid dataUrl");
  }
  const arr = dataUrl.split(",");
  // const mime = arr[0].match(/:(.*?);/)[1];
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error("Invalid MIME type in dataUrl");
  const mime = mimeMatch[1];

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};
