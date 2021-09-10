DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `paccess`(IN `pfullname` VARCHAR(100), IN `pemail` VARCHAR(100), IN `pavatar` VARCHAR(255), IN `ppass` VARCHAR(100), IN `psignin` TINYINT, IN `pactive` TINYINT)
BEGIN

DECLARE nid     INT;
DECLARE sname   VARCHAR(100);
DECLARE savatar VARCHAR(100);

	SELECT fverifymail(upper(pemail))
	INTO nid;

   if (nid=0)then
     INSERT INTO users(fullname,email,PASSWORD,avatar,signin,PROFILE,active)
     VALUES  (pfullname,upper(pemail),ppass,pavatar,psignin,'NON',pactive);
     
     SELECT fverifymail(upper(pemail))
	  INTO nid;
   END IF;
   
   SELECT id, fullname, avatar, active, profile
   FROM   users 
   WHERE  id = nid
	AND    signin=psignin;   /* se lo busca tal como se lo quiso insertar*/
	
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `paccesslog`(IN `pemail` VARCHAR(100), IN `ppass` VARCHAR(100))
BEGIN

   SELECT id, fullname, avatar, active, profile
   FROM   users 
   WHERE  email=upper(pemail)
	AND    password=ppass
    and    active=1;
	
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `fverifymail`(`pemail` VARCHAR(100)
) RETURNS int(11)
    NO SQL
BEGIN
   declare nres int;
   
   SELECT id
	INTO   nres
	from   users
	where  email=upper(pemail);
	
	if (nres IS null) then
	  SET nres=0;
	END if;
	
	RETURN nres;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `psendpass`(IN `pemail` VARCHAR(100), IN `ppass` VARCHAR(100))
    NO SQL
begin 

   UPDATE users
   SET password=ppass, active=1, modified=now()
   WHERE email=upper(pemail)
   and   signin=0;
   
   SELECT fullname
   FROM   users
   WHERE  email=upper(pemail)
   AND    signin=0
   and    active=1;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pusersget`(IN `pid` INT)
    NO SQL
BEGIN

   select id , fullname, email, signin, profile, active, createdate, modified
   from users
   where id=pid
   OR    pid=-1;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pvalidatereg`(IN `pemail` VARCHAR(100))
BEGIN

   UPDATE users
   SET active=1
   WHERE email=upper(pemail);
   
   SELECT fullname
   FROM   users
   WHERE  email=upper(pemail)
   AND    active=1;
   
END$$
DELIMITER ;
