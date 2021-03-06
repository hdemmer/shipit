function getShader(gl, id, type) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = shaderScript.text;

    if (!type) {
        if (shaderScript.type == "x-shader/x-fragment") {
            type = gl.FRAGMENT_SHADER;
        } else if (shaderScript.type == "x-shader/x-vertex") {
            type = gl.VERTEX_SHADER;
        } else {
            // Unknown shader type
            return null;
        }
    }
    shader = gl.createShader(type);

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}


function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    // Create the shader program

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);

    scaleTranslateUniform = gl.getUniformLocation(shaderProgram, "scaleTranslate");
    gl.uniform4fv(scaleTranslateUniform, [1,1,0,0]);

    colorUniform = gl.getUniformLocation(shaderProgram, "color");
    gl.uniform4fv(colorUniform, [1,1,1,1]);
}

function setDrawCallPosition(x,y,m)
{
    gl.uniform4fv(scaleTranslateUniform, [2/pixWidth,2/pixHeight,x/(0.5*pixWidth)-1,y/(0.5*pixHeight)-1]);
}

function setDrawCallColor(r,g,b,a)
{
    gl.uniform4fv(colorUniform, [r,g,b,a]);
}
