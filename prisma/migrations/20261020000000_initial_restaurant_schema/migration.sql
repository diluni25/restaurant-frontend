-- CreateTable
CREATE TABLE `admin_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'ADMIN',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `menu_categories_name_key`(`name`),
    UNIQUE INDEX `menu_categories_slug_key`(`slug`),
    INDEX `menu_categories_isActive_sortOrder_idx`(`isActive`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_items` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `slug` VARCHAR(180) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `menu_items_slug_key`(`slug`),
    INDEX `menu_items_categoryId_isAvailable_sortOrder_idx`(`categoryId`, `isAvailable`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(32) NOT NULL,
    `customerName` VARCHAR(120) NOT NULL,
    `customerEmail` VARCHAR(254) NULL,
    `customerPhone` VARCHAR(32) NULL,
    `type` ENUM('DINE_IN', 'TAKEAWAY', 'DELIVERY') NOT NULL DEFAULT 'DINE_IN',
    `status` ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `tableName` VARCHAR(80) NULL,
    `notes` TEXT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `tax` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `deliveryFee` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `total` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `currency` CHAR(3) NOT NULL DEFAULT 'USD',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    INDEX `orders_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `orders_customerEmail_createdAt_idx`(`customerEmail`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `menuItemId` VARCHAR(191) NULL,
    `itemName` VARCHAR(160) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `lineTotal` DECIMAL(10, 2) NOT NULL,
    `specialNotes` VARCHAR(500) NULL,

    INDEX `order_items_orderId_idx`(`orderId`),
    INDEX `order_items_menuItemId_idx`(`menuItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` VARCHAR(191) NOT NULL,
    `guestName` VARCHAR(120) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `phone` VARCHAR(32) NULL,
    `partySize` INTEGER NOT NULL,
    `requestedAt` DATETIME(3) NOT NULL,
    `tableName` VARCHAR(80) NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `reservations_requestedAt_status_idx`(`requestedAt`, `status`),
    INDEX `reservations_email_createdAt_idx`(`email`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `phone` VARCHAR(32) NULL,
    `topic` ENUM('RESERVATION', 'PRIVATE_DINING', 'CELEBRATION', 'DIETARY', 'OTHER') NOT NULL DEFAULT 'OTHER',
    `preferredAt` DATETIME(3) NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NEW', 'IN_PROGRESS', 'REPLIED', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
    `reply` TEXT NULL,
    `repliedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `inquiries_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `inquiries_topic_createdAt_idx`(`topic`, `createdAt`),
    INDEX `inquiries_email_createdAt_idx`(`email`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu_items` ADD CONSTRAINT `menu_items_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `menu_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menu_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
