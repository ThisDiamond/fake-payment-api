export default {
    ifEqual(a: any, b: any, options: any) {
        if (a == b) {
            return options.fn(this)
        }
        return options.inverse(this)
    }
}
