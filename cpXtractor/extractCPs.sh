source ~/.profile

#Extract CP's
echo Extracting checkpoints from  $1
wkmpt decode --dest course.txt -o $1
python3 checkpoint.py course.txt $2

echo Extract collision file
wkclt decode --dest course.obj -o $1
python3 scaleObj.py course.obj $2
obj2gltf -i out.obj -o kcl.glb

#rm course.txt
rm course.obj
rm out.obj
rm course.txt
rm course.mtl
