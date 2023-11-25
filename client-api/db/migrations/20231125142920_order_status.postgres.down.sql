alter table orders drop column status;

drop type if exists enum_order_status;