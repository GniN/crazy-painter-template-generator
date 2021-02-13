import { Question, Option } from "@/classes/template-generator.models";

const CSV_SEPARATOR = ',';

export const HOST_NAME = '主機';

export class TemplateGeneratorHelper {
    static parseInput(userMocksRawInput: string, answersRawInput: string, paintersRawInput: string): Question[] {
        const userMocks = userMocksRawInput.split(/\n/);
        const answers = answersRawInput.split(CSV_SEPARATOR);
        const painters = paintersRawInput.split(CSV_SEPARATOR);
        const userMocksMap = this.parseUserMocks(userMocks);
        userMocksMap[HOST_NAME] = answers;

        let rs: Question[] = [];

        answers.forEach((answer, index) => {
            const options: Option[] = [];

            Object.keys(userMocksMap).forEach((userName) => {
                const answerOfTheUser = userMocksMap[userName][index];

                const hitOptionIndex = options.findIndex(o => o.value === answerOfTheUser)
                if (hitOptionIndex > -1) {
                    options[hitOptionIndex].users.push(userName)
                } else {
                    options.push({
                        value: answerOfTheUser,
                        users: [userName]
                    })
                }
                
            })

            rs.push({
                realAnswer: answer,
                painter: painters[index],
                options: this.shuffle(options).map((o, oi) => {
                    o.letter = this.toLetters(oi+1)
                    return o
                })
            })
        })

        return rs;
    }

    private static parseUserMocks(userMocks: string[]): {[key: string]: string[]} {
        let rs = {};
        userMocks.forEach(m => {
            const mocksFromTheUser = m.split(CSV_SEPARATOR).slice(1,);
            const user = m.split(CSV_SEPARATOR)[0];

            rs[user] = mocksFromTheUser;
        })
        return rs;
    }

    private static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    private static toLetters(num) {
        var mod = num % 26,
            pow = num / 26 | 0,
            out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? this.toLetters(pow) + out : out;
    }
}