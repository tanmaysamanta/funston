|LN|opcode|operands|CL|NL|A|B|C|D|EQ|NE|GT|LT|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|10|START||10|20|0|0|0|0|false|false|false|false|
|20|MOV|A,10|20|30|10|0|0|0|false|false|false|false|
|30|MOV|B,A|30|40|10|10|0|0|false|false|false|false|
|40|ADD|A,B|40|45|20|10|0|0|false|false|false|false|
|45|ADD|A,10|45|50|30|10|0|0|false|false|false|false|
|50|SUB|A,10|50|60|20|10|0|0|false|false|false|false|
|60|SUB|A,B|60|70|10|10|0|0|false|false|false|false|
|70|CMP|A,10|70|80|10|10|0|0|true|false|false|false|
|80|JLE|100|80|100|10|10|0|0|true|false|false|false|
|100|STOP||100|0|10|10|0|0|true|false|false|false|