THREE.boostShader = {
  vertexShader: THREE.twoVertexShader,
  fragmentShader: `

  varying vec2 vUv;
  uniform sampler2D map;
  uniform float time;
  const float intensity = 0.2;
  const float minCut = 0.29;
  const float maxCut = 0.64;
  const vec3 blue1 = vec3(0.094,0.567,0.863);
  const vec3 blue2 = vec3(0.415,0.772,0.725);
  //uncomment to activate dark mode!
  //const vec3 blue2 = vec3(0.0078,0.0274,0.2353);
  void main( void ) {
    vec2 disp = texture2D(map,vUv-vec2(time*0.3+0.2,time*-0.05+0.4)).xy*intensity;
    float col1 = texture2D(map,vUv*1.5+vec2(time*0.1,time*0.1)+disp).x;
    float col2 = texture2D(map,vUv*0.4-vec2(time*0.2+0.2,time*0.05+0.4)+disp).x*-1.0+1.0;
    float col3 = texture2D(map,vUv*0.2+vec2(time*0.1,time*0.1)+disp).x;
    float col4 = texture2D(map,vUv*0.1-vec2(time*0.2+0.2,time*0.05+0.4)+disp).x*-1.0+1.0;
    float col = mix(col1,col2,0.5);
    float bcol = mix(col3,col4,0.5);
    col = (col - 0.5 )*0.9 + 0.5;
    if(col>minCut && col < maxCut){
      col = 0.0;
    }
    gl_FragColor = vec4(mix(blue1,blue2,bcol)+vec3(col),1.0);
  }

  `
}
