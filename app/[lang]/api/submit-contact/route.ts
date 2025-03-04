//import { NextResponse } from 'next/server';

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  message?: string;
  lang: string;
}

export async function POST(req: Request) {
  try {

    const body: ContactFormData = await req.json();

    const { firstName, lastName, phone, email, message, lang } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Email is required' }),
        { status: 400 }
      );
    }

    let contactId: string | null = null;

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

    //console.log("Search data " +JSON.stringify(searchData));

    if (searchResponse.ok && searchData.results.length > 0) {
      // Contact exists, get the contact ID
      contactId = searchData.results[0].id;
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
              firstname: firstName || '',
              lastname: lastName || '',
              phone: phone || '',
              email: email,
              message: message || '',
              preferred_language: lang,
              form_source: "website_contact_form",
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

      const createData = await createResponse.json();
      contactId = createData.id;
    }

    // Step 3: Add a task associated with the contact
    if (contactId) {
      const taskResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            properties: {
              hs_timestamp: new Date().toISOString(),
              hs_task_body: 'Contact form message: ' +message,
              hs_task_subject: 'Get in Touch',
              hs_task_status: 'WAITING',
              hs_task_priority: 'HIGH',
              hs_task_type: 'TODO',
              hubspot_owner_id: '75756125', // Assign task to specific user
            },
            associations: [
              {
                to: {
                  id: contactId,
                },
                types: [
                  {
                    associationCategory: 'HUBSPOT_DEFINED',
                    associationTypeId: 204, // Contact-to-task association type
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!taskResponse.ok) {
        const errorData = await taskResponse.json();
        return new Response(
          JSON.stringify({ message: errorData.message }),
          { status: taskResponse.status }
        );
      }
     
    
    }

    return new Response(
      JSON.stringify({ message: 'Contact and task processed successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal server error', error: (error as Error).message }),
      { status: 500 }
    );
  }
}