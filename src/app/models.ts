export interface ServiceItem {
	id: number;
	category: string;
	name: string;
	description: string;
	price: number | null;
	sortOrder: number;
}

export interface Settings {
	id: number;
	phone: string;
	whatsapp: string;
	email: string;
	hours: string;
	branches: string;
	mapsUrl: string;
	instagram: string;
	facebook: string;
	experience: string;
	careClaim: string;
	fabricClaim: string;
	customerClaim: string;
}

export interface Pickup {
	id: number;
	name: string;
	phone: string;
	email: string;
	address: string;
	service: string;
	preferredDate: string;
	preferredTime: string;
	notes: string;
	status: string;
	createdAt: string;
}

export interface Message {
	id: number;
	name: string;
	phone: string;
	email: string;
	message: string;
	isRead: boolean;
	createdAt: string;
}
