import sys
import math
file = open(sys.argv[1],"r")
ready = False
start = False
scaleFactor = float(sys.argv[2])
output = open("out.js","w");
first = True

output.write("var cp = [\n")

def convert(a):
    return float(a)*scaleFactor

for line in file:
    line = line.strip();
    if "[CKPT]" in line and line[0]!="#":
        ready = True

    if ready and "[CNPT]" in line:
        ready = False
        output.write("]\n")
    if "[KTPT]" in line and line[0]!="#":
        start = True
    if "[MSPT]" in line and line[0]!="#":
        start = False
    if len(line)>0 and start and line[0]!="#" and line[0]!="@" and line[0]!="$" and line[0]!="[":
        output.write("var startPos = new THREE.Vector3({0},{1},{2})\n".format(*list(map(convert,line.split()[1:5]))))
        output.write("var theta = {0}\n".format(float(line.split()[5])*math.pi/180))
    if len(line)>0 and ready and line[0]!="#" and line[0]!="@" and line[0]!="$" and line[0]!="[":
        if not first:
            output.write(",\n")
        first = False
        output.write("[{0},{1},{2},{3}]".format(*list(map(convert,line.split()[1:5]))))
