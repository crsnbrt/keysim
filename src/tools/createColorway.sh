if [ $# -lt 2 ]; then
    echo "not enough args"
    exit 1
fi


cd ../config/colorways
echo "creating colorway: $1"

if grep -Fqe "colorway_${1}" colorways.js
then
    echo "colorway already exists"
    exit 1
fi

cp ./colorway_template.json ./colorway_$1.json


sed -i '' "s/COLORWAY_NAME/${1}/g" colorway_$1.json
sed -i '' "s/COLORWAY_LABEL/${2}/g" colorway_$1.json


sed -i '' "s,//IMPORT,//IMPORT|import colorway_$1 from './colorway_$1.json';,g" colorways.js
tr '|' '\n' < colorways.js > temp_output.txt
rm colorways.js
mv temp_output.txt colorways.js


sed -i '' "s,//APPEND,//APPEND|'$1': colorway_$1\,,g" colorways.js
tr '|' '\n' < colorways.js > temp_output.txt
rm colorways.js
mv temp_output.txt colorways.js
