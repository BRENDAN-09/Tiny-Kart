svg = open("./out.svg","w")
svg.write("""<svg viewBox="-800 -800 800 800" xmlns="http://www.w3.org/2000/svg">""")
for line in open("./coolcastle.obj"):
    if line[0] == 'v' and line[1] == ' ':
        p = line.strip().split(" ")[1:4]
        svg.write("""<circle cx="{}" cy="{}" r="5"/>""".format(p[0],p[2]))
svg.write("""</svg>""")
