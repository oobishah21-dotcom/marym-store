Add-Type -AssemblyName System.Drawing

function Create-PlaceholderImage {
    param (
        [string]$Path,
        [int]$Width,
        [int]$Height,
        [System.Drawing.Color]$BgColor,
        [System.Drawing.Color]$AccentColor,
        [string]$Title,
        [string]$Subtitle,
        [string]$Tag
    )

    $bmp = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    # Background gradient
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
    $creamColor = [System.Drawing.Color]::FromArgb(250, 246, 239)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        $BgColor,
        $creamColor,
        [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
    )
    $g.FillRectangle($brush, $rect)

    # Soft decorative card circle
    $cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, $AccentColor))
    $circleSize = [int]($Width * 0.7)
    $circleX = [int](($Width - $circleSize) / 2)
    $circleY = [int](($Height - $circleSize) / 2 - 20)
    $g.FillEllipse($cardBrush, $circleX, $circleY, $circleSize, $circleSize)

    # Secondary inner ring
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, $AccentColor), 2)
    $g.DrawEllipse($pen, $circleX + 30, $circleY + 30, $circleSize - 60, $circleSize - 60)

    # Mist droplets / beauty icon visual
    $accentBrush = New-Object System.Drawing.SolidBrush($AccentColor)
    $g.FillEllipse($accentBrush, [int]($Width/2 - 15), [int]($Height/2 - 110), 30, 45)
    $g.FillEllipse($accentBrush, [int]($Width/2 - 45), [int]($Height/2 - 80), 20, 20)
    $g.FillEllipse($accentBrush, [int]($Width/2 + 25), [int]($Height/2 - 80), 20, 20)

    # Fonts
    $fontFamily = New-Object System.Drawing.FontFamily("Georgia")
    $sansFamily = New-Object System.Drawing.FontFamily("Arial")

    $titleFont = New-Object System.Drawing.Font($fontFamily, 26, [System.Drawing.FontStyle]::Bold)
    $subFont = New-Object System.Drawing.Font($sansFamily, 14, [System.Drawing.FontStyle]::Regular)
    $tagFont = New-Object System.Drawing.Font($sansFamily, 11, [System.Drawing.FontStyle]::Bold)

    $charcoal = [System.Drawing.Color]::FromArgb(43, 43, 43)
    $charcoalBrush = New-Object System.Drawing.SolidBrush($charcoal)
    $grayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 110, 110))

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center

    # Tag badge
    if ($Tag) {
        $tagRect = New-Object System.Drawing.Rectangle([int]($Width/2 - 110), [int]($Height/2 - 30), 220, 32)
        $badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 230, 220))
        $g.FillRectangle($badgeBrush, $tagRect)
        $badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(169, 184, 154), 1.5)
        $g.DrawRectangle($badgePen, $tagRect)
        $badgeTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(95, 115, 85))
        $g.DrawString($Tag.ToUpper(), $tagFont, $badgeTextBrush, [System.Drawing.RectangleF]$tagRect, $sf)
    }

    # Title & Subtitle
    $titleRect = New-Object System.Drawing.RectangleF(20, [float]($Height/2 + 20), [float]($Width - 40), 50)
    $g.DrawString($Title, $titleFont, $charcoalBrush, $titleRect, $sf)

    $subRect = New-Object System.Drawing.RectangleF(40, [float]($Height/2 + 75), [float]($Width - 80), 50)
    $g.DrawString($Subtitle, $subFont, $grayBrush, $subRect, $sf)

    # Save as high quality JPEG
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

    $bmp.Save($Path, $codec, $encoderParams)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $Path"
}

$cream = [System.Drawing.Color]::FromArgb(250, 246, 239)
$sage = [System.Drawing.Color]::FromArgb(169, 184, 154)
$blush = [System.Drawing.Color]::FromArgb(248, 225, 228)
$lavender = [System.Drawing.Color]::FromArgb(231, 224, 245)
$deepSage = [System.Drawing.Color]::FromArgb(95, 115, 85)
$softGray = [System.Drawing.Color]::FromArgb(243, 239, 236)
$beforeRed = [System.Drawing.Color]::FromArgb(245, 230, 230)
$beforeDark = [System.Drawing.Color]::FromArgb(180, 110, 110)
$afterGreen = [System.Drawing.Color]::FromArgb(235, 245, 238)

Create-PlaceholderImage "public/hero.jpg" 1000 1000 $cream $sage "Lumora Cordless Mist Brush" "Mist. Detangle. Shine. | Nano-Hydration" "USB-C Rechargeable"
Create-PlaceholderImage "public/product-1.jpg" 800 800 $softGray $deepSage "Cream White Edition" "Smooth satin finish with ergonomic grip" "Color: Cream White"
Create-PlaceholderImage "public/product-2.jpg" 800 800 $lavender $deepSage "Lavender White Edition" "Subtle pastel lilac with soft-touch grip" "Color: Lavender White"
Create-PlaceholderImage "public/product-3.jpg" 800 800 $blush $deepSage "Fine Nano-Mist Spray" "Ultrasonic atomization for gentle hydration" "Hydration Technology"
Create-PlaceholderImage "public/product-4.jpg" 800 800 $softGray $sage "Scalp Massage Bristles" "Flexible rounded bristle tips soothe the scalp" "Scalp Care"
Create-PlaceholderImage "public/product-5.jpg" 800 800 $lavender $sage "Cordless & USB-C Fast Charge" "Universal USB-C charging with refillable tank" "100% Cordless"
Create-PlaceholderImage "public/before.jpg" 800 800 $beforeRed $beforeDark "Before Lumora" "Dry, tangled hair with noticeable static" "Untreated"
Create-PlaceholderImage "public/after.jpg" 800 800 $afterGreen $deepSage "After Lumora" "Soft, hydrated, smooth & detangled shine" "Treated"
