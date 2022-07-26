import { GeneralObject } from "./koutil";

export const defaultSettings = [
  { "editor.tokenColorCustomizations": {       
    "textMateRules": [
        {
            "scope":"panda.bt.tree",
            "settings": {
                "foreground": "#2c7203",
                "fontStyle": "bold"
            }
        },             
        {
            "scope":"panda.bt.node",
            "settings": {
                "foreground": "#1a8ad4"
            }
        },
        {
            "scope":"panda.bt.control",
            "settings": {
                "foreground": "#ce1ad4"
            }
        },
        {
            "scope":"panda.bt.decorator",
            "settings": {
                "foreground": "#d13939"
            }
        },
        {
            "scope":"panda.bt.behaivors.btc.core",
            "settings": {
                "foreground": "#8AB1B0",
                "fontStyle": "bold"
            }
        },
        {
            "scope":"panda.bt.behaivors.btc",
            "settings": {
                "foreground": "#8AB1B0",
                "fontStyle": "italic"
            }
        }
    ]        
    } 
  },
  { "pandabt-helper.comment": "G" },
] as GeneralObject[];