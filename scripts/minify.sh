#/bin/bash

cd ../dist/css;

echo 'minify css files in dist/css - [STARTING]';

FILES=($(find ./ -name *.css | sed "s/\.css//"));
FILES_LENGTH=(${#FILES[*]});

for t in ${FILES[@]}; do
  name="$t.css";

  group-css-media-queries $name $name;

  css-minify -f $name --output $name;
  mv -f "$t.min.css" "$t.css";
done;

echo "minify css files in dist/css - [BUILDED $FILES_LENGTH FILES]";

$SHELL;