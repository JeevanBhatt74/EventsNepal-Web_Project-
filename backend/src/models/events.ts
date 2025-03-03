import { client } from "../initial-tables-setup";

type Event = {
  id?: string;
  date: string;
  title: string;
  description: string;
  price: number;
  banner_img?: string | null;
  location?: string | null;
  status: string;
};

export class Events {
  async fetchAllEvents(): Promise<Event[]> {
    try {
      const res = await client.query("SELECT * FROM events;");
      return res.rows;
    } catch (err) {
      console.error("Error fetching events:", err);
      throw err;
    }
  }

  async getEventById(eventId: string): Promise<Event | null> {
    try {
      const res = await client.query("SELECT * FROM events WHERE id = $1;", [
        eventId,
      ]);
      return res.rows[0] || null;
    } catch (err) {
      console.error("Error fetching event by ID:", err);
      throw err;
    }
  }

  async addNewEvent(eventData: Event): Promise<string> {
    try {
      const eventId = crypto.randomUUID();

      await client.query(
        `INSERT INTO events (id, date, title, description, price, banner_img, location, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
          eventId,
          eventData.date,
          eventData.title,
          eventData.description,
          eventData.price,
          eventData.banner_img,
          eventData.location,
          eventData.status,
        ]
      );
      console.log(`Event added with ID: ${eventId}`);
      return eventId;
    } catch (err) {
      console.error("Error adding new event:", err);
      throw err;
    }
  }

  async editEvent(eventId: string, updatedData: Event): Promise<void> {
    try {
      const event = await this.getEventById(eventId);

      await client.query(
        `UPDATE events SET date = $1, title = $2, description = $3, price = $4, banner_img = $5, location = $6, status = $8 WHERE id = $7;`,
        [
          // @ts-ignore
          updatedData.date ?? event.date,
          // @ts-ignore
          updatedData.title ?? event.title,
          // @ts-ignore
          updatedData.description ?? event.description,
          // @ts-ignore
          updatedData.price ?? event.price,
          updatedData.banner_img ?? event?.banner_img,
          updatedData.location ?? event?.location,
          eventId,
          updatedData.status ?? event?.status,
        ]
      );
      console.log(`Event with ID ${eventId} updated successfully`);
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  }

  async deleteEventById(eventId: string): Promise<void> {
    try {
      await client.query("DELETE FROM events WHERE id = $1;", [eventId]);
      console.log(`Event with ID ${eventId} deleted successfully`);
    } catch (err) {
      console.error("Error deleting event:", err);
      throw err;
    }
  }

  async isEventPresent(eventId: string): Promise<boolean> {
    try {
      const res = await client.query(
        "SELECT EXISTS(SELECT 1 FROM events WHERE id = $1);",
        [eventId]
      );
      return res.rows[0].exists;
    } catch (err) {
      console.error("Error checking event presence:", err);
      throw err;
    }
  }
}
