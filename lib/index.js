/**
 * The function initializes and compiles vertex and fragment shaders, creates a program object, and
 * returns it.
 * @param {WebGLRenderingContext} gl - The WebGL rendering context that the shader program will be used with.
 * @param {WebGLRenderingContext.VERTEX_SHADER} VERTEX_SHADER_SOURCE - a string containing the source code for the vertex shader.
 * @param {WebGLRenderingContext.FRAGMENT_SHADER} FRAGMENT_SHADER_SOURCE - The source code for the fragment shader, which is responsible for
 * determining the color of each pixel in the rendered image. It is written in GLSL (OpenGL Shading
 * Language) and is executed once per pixel.
 * @returns {WebGLProgram} a WebGL program object that has been created and linked with the provided vertex and
 * fragment shaders.
 */
function initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE);
  gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE);

  // 编译着色器
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // 创建一个程序对象
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  gl.useProgram(program);

  return program;
}

function getTranslateMatrix(x = 0, y = 0, z = 0) {
  // prettier-ignore
  return new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      x,   y,   z,   1.0,
    ]);
}

function getScaleMatrix(x = 1, y = 1, z = 1) {
  // prettier-ignore
  return new Float32Array([
      x,   0.0, 0.0, 0.0,
      0.0, y,   0.0, 0.0,
      0.0, 0.0, z,   0.0,
      0.0, 0.0, 0.0, 1.0,
    ]);
}

// 绕z轴旋转
function getRotateMatrix(deg) {
  // prettier-ignore
  return new Float32Array([
      Math.cos(deg),   Math.sin(deg),   0.0, 0.0,
      -Math.sin(deg),  Math.cos(deg),   0.0, 0.0,
      0.0,             0.0,             1.0, 0.0,
      0.0,             0.0,             0.0, 1.0,
    ]);
}

// 矩阵复合函数 列主序
function mixMatrix(A, B) {
  const result = new Float32Array(16);

  // prettier-ignore
  for (let i = 0; i < 4; i++) {
    result[i] = A[i] * B[0] + A[i + 4] * B[1] + A[i + 8] * B[2] + A[i + 12] * B[3];
    result[i + 4] = A[i] * B[4] + A[i + 4] * B[5] + A[i + 8] * B[6] + A[i + 12] * B[7];
    result[i + 8] = A[i] * B[8] + A[i + 4] * B[9] + A[i + 8] * B[10] + A[i + 12] * B[11];
    result[i + 12] = A[i] * B[12] + A[i + 4] * B[13] + A[i + 8] * B[14] + A[i + 12] * B[15];
  }

  return result;
}

// 获取旋转矩阵
function getRotateMatrixByAxis(axis, deg) {
  let x = 0;
  let y = 0;
  let z = 0;

  switch (axis) {
    case "x":
      x = 1;
      break;
    case "y":
      y = 1;
      break;
    case "z":
      z = 1;
      break;
    default:
      break;
  }

  // prettier-ignore
  return new Float32Array([
      x * x * (1 - Math.cos(deg)) + Math.cos(deg), x * y * (1 - Math.cos(deg)) + z * Math.sin(deg), x * z * (1 - Math.cos(deg)) - y * Math.sin(deg), 0.0,
      x * y * (1 - Math.cos(deg)) - z * Math.sin(deg), y * y * (1 - Math.cos(deg)) + Math.cos(deg), y * z * (1 - Math.cos(deg)) + x * Math.sin(deg), 0.0,
      x * z * (1 - Math.cos(deg)) + y * Math.sin(deg), y * z * (1 - Math.cos(deg)) - x * Math.sin(deg), z * z * (1 - Math.cos(deg)) + Math.cos(deg), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]);
}
