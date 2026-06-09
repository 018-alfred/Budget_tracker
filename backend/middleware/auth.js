const { verifyToken } =
require("@clerk/backend");

module.exports =
async (req,res,next)=>{

 try{

  const token =
  req.headers.authorization
  ?.replace("Bearer ","");

  const payload =
  await verifyToken(
   token,
   {
    secretKey:
    process.env.CLERK_SECRET_KEY
   }
  );

  req.clerkId =
  payload.sub;

  next();

 }catch(err){

  res.status(401).json({
   message:"Unauthorized"
  });

 }

};