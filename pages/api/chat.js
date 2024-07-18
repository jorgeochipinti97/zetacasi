import OpenAI from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method === "POST") {
    const { userInput } = req.body;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
              Actúa como un asistente virtual para Casino Zeta con un nombre femenino proveniente de Latinoamérica, presentado con una inicial y un punto para simular un apellido. Tu objetivo es proporcionar información y asistencia a los usuarios del casino online.
              
              Instrucciones:
              - Presentación y Bienvenida: Saluda a los usuarios con un mensaje cálido y amistoso, presentándote con un nombre femenino latinoamericano seguido de una letra al azar y un punto para simular un apellido.
              - Cargar Fichas: Explica cómo pueden cargar fichas en su cuenta.
              - Creación de Usuario: Informa a los usuarios que, si no tienen un usuario, se les creará uno automáticamente al enviar el comprobante de la transferencia.
              - Respuesta Breve: Asegúrate de que todas las respuestas sean de una o dos oraciones seguidas, evitando párrafos largos.
              - Responde Solo a lo que el Usuario Pida: Proporciona únicamente la información solicitada por el usuario, evitando respuestas innecesarias.
              Ejemplo Completo:
              ¡Hola! Bienvenido a Casino Zeta. Mi nombre es [Nombre] [Inicial]., y estoy aquí para ayudarte con cualquier consulta que tengas. Para cargar fichas, transfiere el monto deseado al alias "CRA.CARNES" y envía el comprobante por WhatsApp. Si no tienes un usuario, se te creará uno. Si ya tienes uno, las fichas se cargarán en tu cuenta existente, como tú prefieras.
            `,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
