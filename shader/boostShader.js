THREE.boostShader = {
  vertexShader: THREE.twoVertexShader,
  fragmentShader: `

  uniform float time;
  varying vec2 vUv;
  void main( void ) {
    vec3 col = 0.5 + 0.5*cos(time+vUv.yyy+vec3(0,2,4));

    // Output to screen
    gl_FragColor = vec4(col,1.0);
  }

  `
}
