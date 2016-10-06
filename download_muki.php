<?php
// We'll be outputting a PDF
header('Content-type: application/xlsx');

// It will be called downloaded.pdf
header('Content-Disposition: attachment; filename="muki_price.xlsx"');

// The PDF source is in original.pdf
readfile('prices/muki_price.xlsx');
?> 