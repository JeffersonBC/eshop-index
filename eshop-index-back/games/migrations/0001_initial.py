# Generated by Django 2.1 on 2019-01-28 01:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SwitchGame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_code_unique', models.CharField(max_length=5, unique=True)),
                ('hide', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='SwitchGameEU',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('url', models.CharField(max_length=256)),
                ('release_date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('nsuid', models.CharField(blank=True, max_length=14, null=True)),
                ('fs_id', models.CharField(max_length=8)),
                ('game_code_system', models.CharField(max_length=3)),
                ('game_code_region', models.CharField(max_length=1)),
                ('game_code_unique', models.CharField(max_length=5, unique=True)),
                ('image_carousel_url', models.CharField(max_length=256)),
                ('image_detail_page_url', models.CharField(max_length=256)),
                ('image_wishlist_url', models.CharField(max_length=256)),
                ('image_url', models.CharField(max_length=256)),
                ('image_sq_url', models.CharField(max_length=256)),
                ('image_sq_h2_url', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='SwitchGameList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('query_json', models.CharField(max_length=256)),
                ('frequency', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SwitchGameListSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='SwitchGameMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('media_type', models.CharField(choices=[('IMG', 'Image URL'), ('YTB', 'YouTube video code')], max_length=3)),
                ('url', models.CharField(max_length=256)),
                ('order', models.IntegerField(default=0)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.SwitchGame')),
            ],
        ),
        migrations.CreateModel(
            name='SwitchGameUS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('slug', models.SlugField()),
                ('release_date', models.DateField()),
                ('nsuid', models.CharField(blank=True, max_length=14, null=True)),
                ('game_code_system', models.CharField(max_length=3)),
                ('game_code_region', models.CharField(max_length=1)),
                ('game_code_unique', models.CharField(max_length=5, unique=True)),
                ('front_box_art', models.URLField()),
                ('video_link', models.CharField(blank=True, max_length=32, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='switchgamelist',
            name='slot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.SwitchGameListSlot'),
        ),
        migrations.AddField(
            model_name='switchgame',
            name='game_eu',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='games.SwitchGameEU'),
        ),
        migrations.AddField(
            model_name='switchgame',
            name='game_us',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='games.SwitchGameUS'),
        ),
    ]
