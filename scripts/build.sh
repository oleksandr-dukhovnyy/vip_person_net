#/bin/bash

cd ../;

echo 'minify css files in dist/css - [STARTING]';

FILES=($(find ./dist/css -name *.css));
FILES_LENGTH=(${#FILES[*]});

for t in ${FILES[@]}; do
  group-css-media-queries $t $t;
done

echo "minify css files in dist/css - [BUILDED $FILES_LENGTH FILES]";

$SHELL;