import { connect } from "../../../../config/dbConfig";
import User from "../../../../models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import generateToken from "../../../../utils/generateToken";

export async function POST(request) {
  try {
    await connect();
    const reqBody = await request.json();
    const { username, name, email, password } = reqBody;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { msg: "Email Already registered." },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });

    user.save();

    const response = NextResponse.json({
      message: "Signup successful",
      data: user,
      success: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
