

export async function POST(req: Request) {

    try {
      const body = await req.json();
      const { email } = body;
  
      if (!email) {
        return new Response(
          JSON.stringify({ message: 'Email is required' }),
          { status: 400 }
        );
      }
  
      //let contactId: string | null = null;
  
      // Step 1: Check if the contact already exists
      const searchResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
              },
            ],
          }),
        }
      );
  
      const searchData = await searchResponse.json();
  
      if (searchResponse.ok && searchData.results.length > 0) {
        // Contact exists, get the contact ID
        //contactId = searchData.results[0].id;
      } else {
        // Step 2: Create a new contact if it doesn't exist
        const createResponse = await fetch(
          'https://api.hubapi.com/crm/v3/objects/contacts',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
            },
            body: JSON.stringify({
              properties: {
                email: email,
                form_source: "website_form"
              },
            }),
          }
        );
  
        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          return new Response(
            JSON.stringify({ message: errorData.message }),
            { status: createResponse.status }
          );
        }
  
        //const createData = await createResponse.json();
        //contactId = createData.id;
      }
  
  
      return new Response(
        JSON.stringify({ message: 'Successfully subscribed to the newsletter' }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Internal server error', error: (error as Error).message }),
        { status: 500 }
      );
    }
  }
  