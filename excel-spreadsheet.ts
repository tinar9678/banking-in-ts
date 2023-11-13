class Spreadsheet {
    private cells: Map<string, string>;
    constructor() {
        this.cells = new Map<string, string>();
    }

    put(cell: string, value: string) {
        this.cells.set(cell, value);
    }

    get(cell: string) : string {
        const value = this.cells.get(cell);
        if (!value) return cell;
        const formulaArr = value?.split("+");
        if (formulaArr?.length === 1) {
            return value!;
        } else {
            let result = 0;
            for (const formula of formulaArr!) {
                result+=Number(this.get(formula));
            }
            return result.toString();
        }
    }
}

const spreadsheet = new Spreadsheet();
spreadsheet.put("A1", "1");
spreadsheet.put("A2", "A1+2");
spreadsheet.put("A3", "A1+A2+3");
console.log(spreadsheet.get("A1")); // 1
console.log(spreadsheet.get("A2")); // 3
console.log(spreadsheet.get("A3")); // 7
// put(”A2”, “A1+2”)

// put(”A3”, “A1+A2+3”)