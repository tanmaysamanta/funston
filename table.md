LN|opcode|operands|CL|NL|A|B|C|D|EQ|NE|GT|LT
---|---|---|---|---|---|---|---|---|---|---|---|---
10|START||10|20|0|0|0|0|0|0|0|0
20|MOV|A,3|20|30|3|0|0|0|0|0|0|0
30|MOV|B,2|30|50|3|2|0|0|0|0|0|0
50|CMP|B,0|50|60|3|2|0|0|0|1|1|0
60|JNE|100|60|100|3|2|0|0|0|1|1|0
100|STOP||100||3|2|0|0|0|1|1|0
