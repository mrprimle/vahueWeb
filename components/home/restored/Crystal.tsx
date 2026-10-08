"use client";
import { useEffect, useRef } from "react";

// Original procedural artwork. No reference-site image, shader, or video is used.
const fragment = `precision highp float;
uniform vec2 resolution; uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
 uv*=3.3; uv+=.09*vec2(sin(uv.y*4.+time*.035),cos(uv.x*3.)); uv+=vec2(sin(time*.06),cos(time*.045))*.18;
 vec2 cell=floor(uv); float nearest=10.;float second=10.;vec2 local=vec2(0.);float seed=0.;
 for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){
 vec2 id=cell+vec2(float(x),float(y));float h=hash(id);
 vec2 center=id+.5+vec2(sin(h*36.+time*.055),cos(h*51.+time*.065))*.27;
 vec2 delta=uv-center;float d=length(delta*vec2(1.,.8));
 if(d<nearest){second=nearest;nearest=d;local=delta;seed=h;}else if(d<second){second=d;}
 }}
 float angle=atan(local.y,local.x);float ridge=pow(abs(sin(angle*(85.+seed*75.)+nearest*16.+sin(angle*9.)*2.)),2.5);
 float fiber=pow(abs(sin(angle*173.+nearest*37.)),7.);
 float shell=smoothstep(.0,.08,second-nearest)*smoothstep(.025,.2,nearest);
 float band=.5+.5*sin(nearest*15.+seed*12.+sin(angle*3.)*1.4-time*.12);
 vec3 cold=vec3(.20,.31,.49);vec3 warm=vec3(.73,.54,.23);
 vec3 material=mix(cold,warm,smoothstep(.4,.85,band));
 material=mix(material,vec3(.79,.81,.81),ridge*.65+fiber*.25);
 float edge=pow(max(0.,1.-nearest*1.4),.6);
 vec3 color=material*shell*(.36+edge*.65);
 color+=vec3(.25,.30,.4)*fiber*.25*shell;
 color*=.85+.15*sin(angle*5.+nearest*9.);
 gl_FragColor=vec4(color,1.);
}`;
export default function Crystal({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const vs = shader(
      gl.VERTEX_SHADER,
      "attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}",
    );
    const fs = shader(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const location = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "resolution"),
      time = gl.getUniformLocation(program, "time");
    let frame = 0,
      last = 0,
      visible = true;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (stamp: number) => {
      if (stamp - last > 32 && visible && !document.hidden) {
        const r = canvas.getBoundingClientRect(),
          dpr = Math.min(devicePixelRatio, 1.5);
        const w = Math.round(r.width * dpr),
          h = Math.round(r.height * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
        gl.uniform2f(resolution, w, h);
        gl.uniform1f(time, paused || media.matches ? 0 : stamp * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        last = stamp;
      }
      if (!paused && !media.matches) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && (paused || media.matches)) draw(100);
    });
    observer.observe(canvas);
    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      draw(performance.now());
    };
    media.addEventListener("change", restart);
    draw(performance.now());
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", restart);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [paused]);
  return <canvas ref={ref} aria-hidden="true" />;
}
