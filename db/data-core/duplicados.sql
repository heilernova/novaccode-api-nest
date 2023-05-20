
-- select * from tb_persons;

delete from tb_persons where id = '9c648f67-61f4-40d2-92ba-5071434bfb8a';
delete from tb_persons where id = '897dd72f-2ace-4878-bd03-b32285ad5c75';
delete from tb_persons where id = '587d660f-a15d-4d2b-ac61-060785339dd2';
delete from tb_persons where id = '29521fd9-79c8-4f52-9e72-4848ee0e326c';
delete from tb_persons where id = 'a021b040-b766-4d3d-be50-dabbb8e4557a';

SELECT *
FROM (  SELECT  *, 
        COUNT(*) OVER(PARTITION BY dni) N
FROM tb_persons) as A
WHERE N > 1;
