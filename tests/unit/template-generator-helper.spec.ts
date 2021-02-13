import { HOST_NAME, TemplateGeneratorHelper } from "@/helpers/template-generator-helper"

describe('template-generator-helper', () => {
    it('Parsing input', () => {
        // given
        const userMocks = 
`userName01,user01-mockAnswer01,user01-mockAnswer02
userName02,user02-mockAnswer01,user02-mockAnswer02
userName03,user03-mockAnswer01,ans02`
        
        const answers = `ans01,ans02`
        const painters = `p01,p02`
        // where
        const rs = TemplateGeneratorHelper.parseInput(userMocks, answers, painters);
        

        // then
        expect(rs[0].realAnswer).toBe('ans01')
        expect(rs[0].options
                .some(o => 
                    o.users.includes('userName02'))).toBeTruthy();
        expect(rs[0].options.some(o => o.value === 'user01-mockAnswer01')).toBeTruthy();
        expect(rs[0].options.some(o => o.value === 'user03-mockAnswer01')).toBeTruthy();

        expect(rs[1].options.some(o => o.value === 'ans02')).toBeTruthy();
        expect(rs[1].options
            .some(o => 
                o.users.includes('userName03') && o.users.includes(HOST_NAME))).toBeTruthy();
    })
})
