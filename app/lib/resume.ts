'use server'
import { Mistral } from '@mistralai/mistralai';

export async function getResume(formData: { education?: any; experience?: any; skills?: any; offer?: any; }) {


    const apiKey = process.env.MISTRAL_API_KEY;

    const client = new Mistral({ apiKey: apiKey });

    const result = await client.chat.stream({
        model: "mistral-small-latest",
        messages: [

            { role: 'user', content: `Here is my CV: Education:${formData.education},Experience:${formData.experience}, Skills:${formData.skills} to this job offer:${formData.offer} ` },
            { role: 'user', content: `Here is the job offer:${formData.offer} ` },
            { role: 'user', content: 'Adapt my CV to the job offer. It should be a maximum of one page. Sort out the information that might be useful.' }

        ]
    });

    //pb avec le server->client pour le stream
    let r = ""
    for await (const chunk of result) {
        const streamText = chunk.data.choices[0].delta.content;
        r += streamText
    }


    if (r) {
        return r;
    } else {
        return "Error"
    }
    

}