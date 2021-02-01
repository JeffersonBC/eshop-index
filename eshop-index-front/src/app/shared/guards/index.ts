import { AdminGuard } from '@guards/admin.guard';
import { AuthGuard } from '@guards/auth.guard';
import { NotAuthGuard } from '@guards/not-auth.guard';


export const guards = [
    AdminGuard,
    AuthGuard,
    NotAuthGuard
];
