THREE.lightMapShader = {
  vertexShader: THREE.twoVertexShader,
  fragmentShader: `

  uniform sampler2D map;
  uniform sampler2D shadowMap;
  varying vec2 vUv;
  varying vec2 vUv2;
  void main( void ) {
    vec4 basCol = texture2D(map,vUv);
    if(basCol.a<0.5)discard;
    vec4 shadowCol = texture2D(shadowMap,vUv2);
    gl_FragColor = vec4(basCol*shadowCol);
  }
  
  `
}
