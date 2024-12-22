import { NextResponse } from 'next/server';
import users from '../../../data/USER_DATA.json'

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
