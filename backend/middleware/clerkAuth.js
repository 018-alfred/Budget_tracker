const { verifyToken } =
require("@clerk/backend");

module.exports = async (req,res,next)=>{

 try{

  const authHeader =
  req.headers.authorization;

  if(!authHeader){

   return res.status(401).json({
    message:"Unauthorized"
   });

  }

  const token =
  authHeader.replace("Bearer ","");

  const payload =
  await verifyToken(
   token,
   {
    secretKey:
    process.env.CLERK_SECRET_KEY
   }
  );

  req.userId =
  payload.sub;

  next();

 }
 catch(error){

  return res.status(401).json({
   message:"Invalid Token"
  });

 }

};