// const yaml = require('js-yaml');

DEFAULT_SECONDARIES = {
    "1":"!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^",
    "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+",
    "[": "{", "]": "}", "\\": "|", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "`": "`"
}

CUSTOM_SECONDARIES = {
    "!":"&", "@": "#", "$": "%", "(":")"
}

class Key {
    constructor(_primary, _secondary = null) {
        this.primary = _primary;
        this.secondary = _secondary;
        this.pri_class = "primary_key";
        if (_secondary == null)
        {
            // Use custom if there
            if(this.primary in CUSTOM_SECONDARIES)
            {
                this.secondary = CUSTOM_SECONDARIES[this.primary];
            }
            // Use default if there
            else if (this.primary in DEFAULT_SECONDARIES)
            {
                this.secondary = DEFAULT_SECONDARIES[this.primary];
            }
            // Otherwise, the key has no secondary.
            else
            {
                this.pri_class = "primary_only_key";
            }
        }
    }
}

let rows = 4
let cols = [10, 10, 10, 4]
let split = true

let layers = [[
    new Key("q"), new Key("w"), new Key("e"), new Key("r"), new Key("t"), /**/ new Key("y"), new Key("u"), new Key("i"), new Key("o"), new Key("p"),
    new Key("a"), new Key("s"), new Key("d"), new Key("f"), new Key("g"), /**/ new Key("h"), new Key("j"), new Key("k"), new Key("l"), new Key(";"),
    new Key("z"), new Key("x"), new Key("c"), new Key("v"), new Key("b"), /**/ new Key("n"), new Key("m"), new Key(","), new Key("."), new Key("/"),
/*                                 */new Key("Space"), new Key("Shift"), /**/ new Key("Ctrl"), new Key("L1")
],
[
    new Key("ESC"), new Key("HOME"), new Key("END"), new Key("INS"), new Key("PG UP"), new Key("!"), new Key("@"), new Key("$"), new Key("^"), new Key("BACK"),
    //----------------------------------------------------------------------------                  ----------------------------------------------------------------------------------
    new Key("TAB"), new Key("ALT"), new Key("GUI"), new Key("DEL"), new Key("PG DN"), new Key("[", "{"), new Key("]", "}"), new Key("=", "+"), new Key("-", "_"), new Key("Enter"),
    //----------------------------------------------------------------------------                  ----------------------------------------------------------------------------------
    new Key("F1"), new Key("F2"), new Key("F3"), new Key("F4"), new Key("F5"), new Key("F6"), new Key("F7"), new Key("F8"), new Key("F9"), new Key("\\", " | "),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("L0"), new Key("SHIFT"), new Key("CTL"), new Key("L2")
],
[
    new Key("ESCAPE"), new Key("PG DN"), new Key("UP"), new Key("PG UP"), new Key("BLAH"), new Key("MINS"), new Key("7"), new Key("8"), new Key("9"), new Key("BSPC"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("TAB"), new Key("LEFT"), new Key("DOWN"), new Key("RIGHT"), new Key("BLAH"), new Key("EQL"), new Key("4"), new Key("5"), new Key("6"), new Key("ENTER"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("RESET"), new Key("*"), new Key("BRIGHT DN"), new Key("BRIGHT UP"), new Key("."), new Key("0"), new Key("1"), new Key("2"), new Key("3"), new Key("L3"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("L0"), new Key("SHIFT"), new Key("CTL"), new Key("L3")
],
[
    new Key("TAB"), new Key("1"), new Key("2"), new Key("3"), new Key("ESC"), new Key("BLAH"), new Key("BLAH"), new Key("BLAH"), new Key("BLAH"), new Key("TRANSP"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("CAPS"), new Key("Q"), new Key("W"), new Key("E"), new Key("R"), new Key("G"), new Key("NO"), new Key("NO"), new Key("NO"), new Key("ENTER"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("LSFT"), new Key("A"), new Key("S"), new Key("D"), new Key("F"), new Key("B"), new Key("M"), new Key("MS ACC1"), new Key("MS ACC2"), new Key("NO"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("C"), new Key("SPACE"), new Key("RALT"), new Key("L0")
]
];

class KeyRow
{
    constructor(row, cols, split)
    {
        this.row = row;
        this.split = split;
        this.cols = cols;

        console.assert(this.cols % 2 != 0, "Keyboard viewer does not support odd-length split keyboard rows");

        let keyboard = document.getElementById("keyboard"); 
        
        this.left = document.createElement("div");
        this.left.id = "key_row_" + row + "_left";
        this.left.className = "keyboard_row"
        keyboard.appendChild(this.left);

        
        this.right = null;
        if(this.split)
        {
            this.left.className = "keyboard_row_split_left";
            this.right = document.createElement("div");
            this.right.id = "key_row_" + row + "_right";
            this.right.className = "keyboard_row_split_right";
            keyboard.appendChild(this.right);
        }
    }

    appendChild(element)
    {
        // Append to left side if still in first half of row.
        if(!this.split || (this.left.children.length < this.cols/2))
        {
            this.left.appendChild(element);
        }
        // Otherwise, the rest go on the right side.
        else
        {
            this.right.appendChild(element);
        }
    }
}

class Keyboard {
    constructor(layers, rows, cols, split)
    {
        this.layers = layers;
        this.rows = rows;
        this.cols = cols;
        this.split = split;

        console.assert(this.rows == this.cols.length, 'Rows and cols out of sync');

        // Create keyboard body.
        this.keyboard = document.createElement("div")
        this.keyboard.id = "keyboard"
        this.keyboard.className = "keyboard_body"
        document.getElementById("keyboard_body").appendChild(this.keyboard)


        // Setup layer select
        this.layer_select = document.getElementById("layer_select");
        for (let i = 0; i < this.layers.length; i++) {
            var opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = i;
            this.layer_select.appendChild(opt);
        }

        console.log("gonna make keyboard elems: " + rows + " [" + cols + "]");


        // Create keyboard elements
        var idx = 0;
        for(var row = 0; row < rows; row++)
        {
            // Setup new row.
            var key_row = new KeyRow(row, this.cols[row], true);

            // Add key elements.
            for(var col = 0; col < cols[row]; col++)
            {
                var cont = document.createElement("div");
                cont.id = "key_container_" + idx;
                cont.className = "key_container";
                
                var img = document.createElement("img");
                img.id = "key_img_" + idx;
                img.className = "key_img";
                img.src = "./img/keycap_blank.png";
                
                var pri_key = document.createElement("div");
                pri_key.id = "pri_key_" + idx;
                console.log(pri_key.id);
                
                var sec_key = document.createElement("div");
                sec_key.id = "sec_key_" + idx;
                sec_key.className = "secondary_key";
                
                key_row.appendChild(cont);
                cont.appendChild(img);
                cont.appendChild(pri_key);
                cont.appendChild(sec_key);
                
                idx++;
            }
        }

        // Setup default layer.
        this.update_layer();

        // Setup layer select callback.
        this.layer_select.onchange = this.update_layer;
    }

    update_layer()
    {
        var key_idx = 0;
        var layer_num = this.layer_select.value;
        var layer = this.layers[layer_num];
    
        for (var key_idx = 0; key_idx < layer.length; key_idx++) {
            var pri_key = document.getElementById("pri_key_"+key_idx);
            var sec_key = document.getElementById("sec_key_"+key_idx);

            var key = layer[key_idx];
            pri_key.textContent = key.primary
            pri_key.className = key.pri_class
            sec_key.textContent = key.secondary           
        }
    }
}

var keyboard = new Keyboard(layers, rows, cols, true);
