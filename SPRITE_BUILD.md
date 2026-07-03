Building .svg sprites suck.

Firstly merge all svgs into a single svg.
```sh
npx svgstore-cli -i path/to/svgs/**/*.svg -o path/to/sprite.svg
```
Then open it as text and replace `<svg>` tag at the start:
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
```
This will *hopefully* make it support all browsers to display parts of the svg properly.