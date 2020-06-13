THREE.lightMapShader = {
  vertexShader: THREE.twoVertexShader,
  fragmentShader: `


  uniform sampler2D map;
  varying vec2 vUv;
  void main( void ) {
    vec4 basCol = texture2D(map,vUv);
    if(basCol.a<0.5)discard;
    gl_FragColor = vec4(basCol);
  }

  `
}
