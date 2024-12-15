import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:5003/video_feed');
    if (response.ok) {
      res.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
      });
      if (response.body) {
        const reader = response.body.getReader();
        const stream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              controller.enqueue(value);
            }
            controller.close();
          }
        });

        const newResponse = new Response(stream);
        newResponse.body?.pipeTo(new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          }
        }));
      }
    } else {
      res.status(response.status).send(`Error: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(`Error: ${error.message}`);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
}