create type enum_order_status as enum('processing','confirmed','delivered','cancelled','pending-payment','refunded');

alter table orders add column status enum_order_status default 'processing';