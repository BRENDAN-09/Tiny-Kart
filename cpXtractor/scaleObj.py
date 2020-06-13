import sys
file = open(sys.argv[1],"r")
out = open("out.obj","w")
scaleFactor = float(sys.argv[2])
print("scaling " + sys.argv[1] +" by factor " + (sys.argv[2]))

def c(a):
    return str(float(a) * scaleFactor)

for line in file:
    if len(line)!= 0 and line[0]=="v":
        out.write("v " + " ".join(list(map(c,line.split()[1:4])))+"\n")
    else:
        out.write(line)
