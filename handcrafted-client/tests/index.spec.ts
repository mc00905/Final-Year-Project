describe('testing out JEST', () => {
    it('Should pass on basic maths', () => {
        expect(2+2).toBe(4);
    })
    it('Should fail on bad maths', () => {
        expect(2+2).toBe(5);
    })
})