describe('Rebabel Frontend Testing', () => {
    it('should have a convert button', async () => {
        const elem = await $('#convertBtn')
        await expect(elem).toExist()
    })
})