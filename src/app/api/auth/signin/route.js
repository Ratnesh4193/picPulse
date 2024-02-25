import { connect } from "../../../../config/dbConfig";
import User from "../../../../models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import generateToken from "../../../../utils/generateToken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return NextResponse.json(
        { msg: "Email not registerd!" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, savedUser.password);
    savedUser["password"] = undefined;

    if (!validPassword)
      return NextResponse.json({ msg: "Incorrect Password!" }, { status: 401 });

    //create token data
    const tokenData = {
      _id: savedUser._id,
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
    };

    //create token
    const token = generateToken(tokenData);

    const response = NextResponse.json({
      message: "Login successful",
      data: tokenData,
      token: token,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
