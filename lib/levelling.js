module.exports = {
    
    /**
     * get XP range at specified level
     * @param {Number} level 
     * @param {Number} multiplier 
     */
    xpRange(level, xp, multiplier = global.multiplier || 1) {
        if (level < 0) throw new TypeError('level cannot be negative value')
        let max = (level * level * multiplier)
        let min = (max - xp)
        return {
            min,
            max
        }
    },
    
    /**
     * is able to level up?
     * @param {Number} level 
     * @param {Number} xp 
     * @param {Number} multiplier 
     */
    canLevelUp(level, xp, multiplier = global.multiplier || 1) {
        if (level < 0) return false
        if (xp === Infinity) return true
        if (isNaN(xp)) return false
        if (xp <= 0) return false
        return xp > ((level * level * multiplier) - 1)
    }
}